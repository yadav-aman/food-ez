from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import get_db
from schemas import order, user
from core import oauth2
from models import models
from datetime import datetime, timedelta

router = APIRouter(
    prefix='/dashboard',
    tags=['Dashboard']
)

@router.get('/')
async def get_data(db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_superuser)):
    response = {}

    total_clients = db.query(models.User).count()
    response.update({'clients' : total_clients})

    sales = db.query(models.Orders).filter(models.Orders.status == 'ready')
    total_sales = 0.0
    for x in sales.all():
        price = db.query(models.Product.price).filter(models.Product.id == x.product_id).scalar()
        total_sales += (price * x.qty)
    response.update({'sales' : total_sales})

    orders = db.query(models.Orders).count()
    response.update({'orders': orders})

    completed_orders = sales.count()
    response.update({'completed': completed_orders})

    pending_orders = orders - completed_orders
    response.update({"pending": pending_orders})
    
    return response    