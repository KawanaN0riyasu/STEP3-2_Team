# FastAPI読み込み
from fastapi import FastAPI
# FastAPIが提供するCORS処理ミドルウェア(通信時に使うセキュリティ関連ライブラリ)
from fastapi.middleware.cors import CORSMiddleware

# FastAPIインスタンス化
app = FastAPI()

# 通信許可するオリジン（ドメイン）リスト
origins = [
    # React通信
    #"通信するreactのアプリURLをここに入力",
    # local通信
    "http://localhost:3000",
]

# セキュリティ面のコード
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # 許可するオリジン（ドメイン）のリスト
    allow_credentials=True,  # ブラウザからリクエスト受けた時の認証情報サーバー送信可否指定。Trueの場合は許可
    allow_methods=["*"],     # 許可するHTTPメソッドリスト(Get,Post,Putなど)　["*"]と指定することですべてのHTTPメソッドを許可
    allow_headers=["*"],     # 許可するHTTPヘッダーリスト  ["*"]と指定することですべてのHTTPヘッダーを許可
)

# 12/14宿題対応
stores = {
    "name": "Store1",
    "items": [
        {
            "name": "Chair",
            "price": 15.99
        }
    ]
}

# ローカルサーバー(http://127.0.0.1:8000)にリクエストが来た時の処理    ※ターミナルにて『uvicorn main:app --reload』実行でローカルサーバー開く
#@app.get("/")                    # 『/』というURLにGetリクエスト来たら、
#async def Hello():               # 『async def』で非同期処理,  『def』なら同期処理    
#    return {"stores":"World!"}

@app.get("/store")
async def get_stores():
    return {"stores": stores}