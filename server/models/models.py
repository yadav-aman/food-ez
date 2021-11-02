from database.database import Base
from sqlalchemy import Column, Integer, String


# database models

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String)
    password = Column(String)
