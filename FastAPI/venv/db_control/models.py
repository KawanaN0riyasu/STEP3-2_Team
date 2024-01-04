# モデル作成
# sqlalchemyから必要なモジュールをインポート
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, types
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# databaseモジュールからBaseクラスをインポート
from database import Base

# Userモデルの定義
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # UserモデルとItemモデルの関連付け
    items = relationship("Item", back_populates="owner")

# Itemモデルの定義
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

# Zukanモデルの定義
class Zukan(Base):
    __tablename__ = "zukans"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    image = Column(String, index=True)
    description = Column(String, index=True)

# Restaurantモデルの定義
class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    gmplace_id = Column(String, index=True)
    name = Column(String, index=True)
    image = Column(String, index=True)
    lat = Column(types.Float, index=True)
    lng = Column(types.Float, index=True)
    address = Column(String, index=True)
    rating = Column(types.Float, index=True)
    status = Column(String, index=True)