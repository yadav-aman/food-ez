from typing import Any
from pydantic import BaseModel
import datetime

class Order(BaseModel):
    product_id: int
    qty: int

class Show_Order(Order):
    id: int
    user_id: int
    created_at: Any
    class Config():
        orm_mode = True