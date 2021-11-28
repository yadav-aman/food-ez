from typing import Any
from pydantic import BaseModel
from schemas.product import Show_Products


class Order(BaseModel):
    product_id: int
    qty: int


class Show_Order(Order):
    id: int
    user_id: int
    product_name: Show_Products
    created_at: Any
    status: str

    class Config():
        orm_mode = True
