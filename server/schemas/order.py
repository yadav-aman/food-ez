from typing import Any
from pydantic import BaseModel
import datetime
from schemas.product import Show_Products

from schemas.user import Show_User

class Order(BaseModel):
    product_id: int
    qty: int

class Show_Order(Order):
    id: int
    user_id: int
    # user_name: Show_User
    product_name: Show_Products
    created_at: Any
    status: str
    class Config():
        orm_mode = True