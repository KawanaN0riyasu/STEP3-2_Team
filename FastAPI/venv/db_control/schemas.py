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
class ZukanCreate(ZukanBase):
    pass
class Zukan(ZukanBase):
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
class RestaurantCreate(RestaurantBase):
    pass
class Restaurant(RestaurantBase):
    id: int
    class Config:
        orm_mode = True

class ZukanRestaurantBase(BaseModel):
    zukan_id: int
    restaurant_id: int
    visit_achievements: int

class ZukanRestaurantCreate(ZukanRestaurantBase):
    pass
class ZukanRestaurant(ZukanRestaurantBase):
    id: int
    class Config:
        orm_mode = True