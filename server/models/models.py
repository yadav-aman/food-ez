from database.database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean


# database models

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String)
    password = Column(String)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    qty = Column(Integer)
    is_veg = Column(Boolean)

