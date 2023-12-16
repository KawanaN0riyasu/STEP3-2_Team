from fastapi import FastAPI
import pyodbc

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=tech-food-explorers.database.windows.net;'
        'DATABASE=もぐもぐ図鑑;' 
        'UID=tech0;'
        'PWD=Explorers5'
    )
    return conn

@app.get("/items/")
def read_items():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM your_table')  # 'your_table' を適切なテーブル名に変更
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"items": items}
    except Exception as e:
        return {"error": str(e)}

def create_users_table():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE users (
                id INT PRIMARY KEY,
                user_name NVARCHAR(255)
            );
        ''')
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        return str(e)

@app.post("/create-table")
def create_table():
    create_users_table()
    return {"message": "Users table created successfully"}
