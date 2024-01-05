from pydantic import BaseModel

class ItemBase(BaseModel):
    title: str
    description: str | None = None
class ItemCreate(ItemBase):
    pass
class Item(ItemBase):
    id: int
    owner_id: int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str
class UserCreate(UserBase):
    password: str
class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []
    class Config:
        orm_mode = True

class ZukanBase(BaseModel):
    title: str
    image: str | None = None
    description: str | None = None
class ZukanCreate(ItemBase):
    pass
class Zukan(ItemBase):
    id: int
    class Config:
        orm_mode = True

class RestaurantBase(BaseModel):
    gmplace_id: str
    name: str
    image: str | None = None
    lat: float
    lng: float
    address: str
    rating: float
    status: str 
class RestaurantCreate(ItemBase):
    pass
class Restaurant(ItemBase):
    id: int
    class Config:
        orm_mode = True

class ZukanRestaurantBase(BaseModel):
    zukan_id: str
    restaurant_id: str

class ZukanRestaurantCreate(ItemBase):
    pass
class ZukanRestaurant(ItemBase):
    id: int
    class Config:
        orm_mode = True