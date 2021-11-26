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
    orders = relationship('Orders', back_populates='user_name')

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    qty = Column(Integer)
    is_veg = Column(Boolean)
    orders = relationship('Orders', back_populates='product_name')

class Orders(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    qty = Column(Integer)
    status = Column(String, default='pending')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user_name = relationship('User', back_populates='orders')
    product_name = relationship('Product', back_populates='orders')