from fastapi import FastAPI, HTTPException
import pyodbc
from typing import Dict

app = FastAPI()

# データベース接続関数
def get_db_connection():
    conn = pyodbc.connect(
        'Driver={ODBC Driver 18 for SQL Server};'+
        'Server=tcp:tech-food-explorers.database.windows.net,1433;'+
        'Database=もぐもぐ図鑑;'+
        'Uid=tech0;'+
        'Pwd=Explorers5;'+
        'Encrypt=yes;'+
        'TrustServerCertificate=no;'+
        'Connection Timeout=30;'
    )
    return conn


# usersテーブルにユーザーデータを追加する関数
# @app.post("/create/users")
# def create_user(entry: Dict):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     placeholders = ', '.join(['?'] * len(entry))
#     columns = ', '.join(entry.keys())
#     values = tuple(entry.values())
#     sql = f"INSERT INTO users ({columns}) VALUES ({placeholders})"
#     try:
#         cursor.execute(sql, values)
#         conn.commit()
#         return {"message": "Entry created successfully."}
#     except Exception as e:
#         conn.rollback()
#         raise HTTPException(status_code=400, detail=str(e))
#     finally:
#         cursor.close()
#         conn.close()


        # usersテーブルから全データを読み込む関数
@app.get("/read/users")
def read_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # ユーザー情報と関連する統計情報を取得するためのクエリ
        cursor.execute("""
            SELECT 
                u.*,
                (SELECT COUNT(*) FROM follows WHERE user_id = u.user_id) AS follow,
                (SELECT COUNT(*) FROM follows WHERE follow_user_id = u.user_id) AS follower,
                (SELECT COUNT(*) FROM illustrated_books WHERE user_id = u.user_id) AS count_book
            FROM 
                users u;
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in rows]
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        conn.close()



# usersテーブルから特定のユーザーデータを読み込む関数
from fastapi import Path

@app.get("/read/users/{user_id}")
def read_user(user_id: str = Path(..., description="The user ID to retrieve")):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE user_id = ?", user_id)
        row = cursor.fetchone()
        if row:
            columns = [column[0] for column in cursor.description]
            result = dict(zip(columns, row))
            return result
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        conn.close()




#usersテーブルから特定のユーザーデータを更新する関数
#まず更新可能なすべてのフィールドを定義
from pydantic import BaseModel
from typing import Optional
from datetime import date

class UserUpdateModel(BaseModel):
    user_pw: Optional[str] = None
    name: Optional[str] = None
    icon_id: Optional[str] = None
    title_id: Optional[str] = None
    title_get_date: Optional[date] = None
    last_login: Optional[date] = None

@app.put("/update/users/{user_id}")
def update_user(user_id: str, user_data: UserUpdateModel):
    conn = get_db_connection()
    cursor = conn.cursor()

        # 指定された user_id が存在するかどうかを確認
    cursor.execute("SELECT COUNT(*) FROM users WHERE user_id = ?", user_id)
    if cursor.fetchone()[0] == 0:
        raise HTTPException(status_code=404, detail="User not found")

    # 更新するデータを準備
    update_data = user_data.dict(exclude_unset=True)
    update_fields = ', '.join([f"{key} = ?" for key in update_data.keys()])
    values = list(update_data.values())

    # SQLクエリの実行
    try:
        cursor.execute(f"UPDATE users SET {update_fields} WHERE user_id = ?", *values, user_id)
        conn.commit()
        return {"message": "User updated successfully."}
    except Exception as e:
        conn.rollback()
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()


# usersテーブルから特定のユーザーデータを削除する関数
@app.delete("/delete/users/{user_id}")
def delete_user(user_id: str = Path(..., description="The user ID to delete")):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # ユーザーが存在するかどうかを確認
        cursor.execute("SELECT COUNT(*) FROM users WHERE user_id = ?", user_id)
        if cursor.fetchone()[0] == 0:
            raise HTTPException(status_code=404, detail=f"User with user_id {user_id} not found")

        # ユーザーの削除
        cursor.execute("DELETE FROM users WHERE user_id = ?", user_id)
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail=f"User with user_id {user_id} not found or already deleted")
        return {"message": "User deleted successfully."}
    except pyodbc.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        cursor.close()
        conn.close()








@app.post("/create/illustrated_books")
def create_illustrated_books(entry: Dict):
    conn = get_db_connection()
    cursor = conn.cursor()

    placeholders = ', '.join(['?'] * len(entry))
    columns = ', '.join(entry.keys())
    values = tuple(entry.values())
    sql = f"INSERT INTO illustrated_books ({columns}) VALUES ({placeholders})"
    try:
        cursor.execute(sql, values)
        conn.commit()
        return {"message": "Illustrated books entry created successfully."}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        conn.close()
