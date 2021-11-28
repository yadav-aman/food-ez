from pydantic import BaseModel


class Product(BaseModel):
    name: str
    description: str
    price: float
    is_veg: bool
    qty: int


class Show_Products(Product):
    id: int

    class Config():
        orm_mode = True
