from pydantic import BaseModel
from typing import List

class User(BaseModel):
    name: str
    username: str
    password: str

class Show_User(BaseModel):
    name: str
    username: str
    # is_superuser: bool
    # preferences: List[Preferences] = []
    class Config():
        orm_mode = True