from fastapi import FastAPI, HTTPException, Depends, Query # FastAPI読み込み
from fastapi.middleware.cors import CORSMiddleware  # FastAPIが提供するCORS処理ミドルウェア(通信時に使うセキュリティ関連ライブラリ)
from fastapi.responses import StreamingResponse
from PIL import Image
from io import BytesIO
from typing import List, Optional
from pydantic import BaseModel
from db_control import crud, models, schemas
from database import SessionLocal, engine, get_db
import logging
from sqlalchemy import desc
from sqlalchemy.orm import Session, joinedload

models.Base.metadata.create_all(bind=engine)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# コンソールハンドラを追加
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# ロガーにハンドラを追加
logger.handlers.clear()
logger.addHandler(console_handler)

# FastAPIインスタンス化
app = FastAPI()

# 通信許可するオリジン（ドメイン）リスト
origins = [
    # React通信
    #"通信するreactのアプリURLをここに入力",
    # local通信
    "http://localhost:3000",
    "http://localhost:3000/map_suzu_kawana",
    "http://localhost:3000/04_createZukanTitle",
    "http://localhost:3000/05_zukanList",
    "*",
]

# セキュリティ面のコード
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # 許可するオリジン（ドメイン）のリスト
    allow_credentials=True,  # ブラウザからリクエスト受けた時の認証情報サーバー送信可否指定。Trueの場合は許可
    allow_methods=["*"],     # 許可するHTTPメソッドリスト(Get,Post,Putなど) ["*"]と指定することですべてのHTTPメソッドを許可
    allow_headers=["*"],     # 許可するHTTPヘッダーリスト  ["*"]と指定することですべてのHTTPヘッダーを許可
)

class PlaceData(BaseModel):
    GMid: str
    name: str
    image: Optional[str]
    lat: float
    lng: float
    address: str
    rating: float
    status: str

class ZukanData(BaseModel):
    zukan_name: str
    zukan_image: Optional[str] 
    zukan_memo: Optional[str]

# ローカルサーバー(http://127.0.0.1:8000)にリクエストが来た時の処理    ※ターミナルにて『uvicorn main:app --reload』実行でローカルサーバー開く
@app.get("/")                    # 『/』というURLにGetリクエスト来たら、
async def Hello():               # 『async def』で非同期処理,  『def』なら同期処理    
    return {"stores":"World!"}

# 12/13ADVANCED宿題
@app.get('/api/get-image', response_class=StreamingResponse) #GETメソッドリクエストのエンドポイント設定
async def get_image():                        #エンドポイント処理を定義
    img = Image.open('templates/image/TECHFOODEXPROLERS_ER_Rev3.jpg')  #PILを使用して指定パスの画像ファイルを開く
    img_io = BytesIO()                        #画像データを格納するバイトストリームを作成
    img.save(img_io, 'PNG', quality=70)       #画像をJPEG形式で保存
    img_io.seek(0)                            #バイトストリームの読み取り/書き込み位置をファイルの先頭に戻し
    return StreamingResponse(img_io, media_type='image/png')  #send_file関数を使用して、画像をクライアントに送信

# NEXT.jsからデータを受け取る
@app.post("/api/search")
async def receive_search_data(search_data: List[PlaceData]):
    try:
        print("Received and processed search data:", search_data)
        return {"message": "Data received and processed successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")

# NEXT.jsからデータを受け取る
@app.post("/zukans")
async def create_zukan(ZukanDataJson: List[ZukanData], db: Session = Depends(get_db)):
    try:
        db_zukans = []
        for zukan_data_item in ZukanDataJson:
            db_zukan = models.Zukan(title=zukan_data_item.zukan_name, image=zukan_data_item.zukan_image, description=zukan_data_item.zukan_memo)
            db.add(db_zukan)
            db_zukans.append(db_zukan)
        db.commit()
        for db_zukan in db_zukans:
            db.refresh(db_zukan)

        return db_zukans 
    
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")

# NEXT.jsからデータを受け取る
@app.post("/restaurants")
async def create_restaurant(RestaurantDataJson: List[PlaceData], db: Session = Depends(get_db)):
    try:
        db_restaurants = []
        for restaurant_data_item in RestaurantDataJson:
            db_restaurant = models.Restaurant(
                gmplace_id = restaurant_data_item.GMid, 
                name = restaurant_data_item.name, 
                image = restaurant_data_item.image,
                lat = restaurant_data_item.lat, 
                lng = restaurant_data_item.lng, 
                address = restaurant_data_item.address,
                rating = restaurant_data_item.rating,
                status = restaurant_data_item.status,
            )
            db.add(db_restaurant)
            db_restaurants.append(db_restaurant)
        db.commit()
        for db_restaurant in db_restaurants:
            db.refresh(db_restaurant)
        
        # SQLiteのZukanテーブルから末尾データを取得
        last_zukan = db.query(models.Zukan).order_by(desc(models.Zukan.id)).first()
        last_restaurants = db.query(models.Restaurant).order_by(desc(models.Restaurant.id)).limit(len(RestaurantDataJson)).all()
        db_zukan_restaurants = []
        for last_restaurant in last_restaurants:
            db_zukan_restaurant = models.ZukanRestaurant(
                zukan_id = last_zukan.id,
                restaurant_id = last_restaurant.id,
            )
            db.add(db_zukan_restaurant)
            db_zukan_restaurants.append(db_zukan_restaurant)
        db.commit()
        for db_zukan_restaurant in db_zukan_restaurants:
            db.refresh(db_zukan_restaurant)

        return {"restaurants": db_restaurants, "zukan_restaurants": db_zukan_restaurants }
    
    except Exception as e:
        db.rollback()  # トランザクションのロールバック
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")


@app.get("/get_zukans", response_model=list[schemas.Zukan])
async def read_zukans(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    zukans = crud.get_zukans(db, skip=skip, limit=limit)
    return zukans
