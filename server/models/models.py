from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql import func
from database.database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime


# database models

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String)
    password = Column(String)
    is_superuser = Column(Boolean, default=False)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    qty = Column(Integer)
    is_veg = Column(Boolean)

class Orders(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    qty = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user_name = relationship('User', back_populates='name')
    product_name = relationship('Product', back_populates='name')