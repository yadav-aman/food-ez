from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from sqlalchemy.sql.functions import mode, now

from database.database import get_db
from schemas import order, user
from core import oauth2
from models import models

router = APIRouter(
    prefix='/order',
    tags=['Orders']
)

@router.post('/')
async def create_order(request: order.Order, db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_user)):
    product = db.query(models.Product).filter(models.Product.id == request.product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if product.qty < request.qty :
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Understock")
    
    if request.qty == 0:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="Quantity must be greater than 0")

    new_order = models.Orders(
        product_id = request.product_id,
        user_id = current_user.id,
        qty = request.qty,
    )
    try:
        db.add(new_order)
        product.qty -= request.qty
        db.commit()
        db.refresh(new_order)
        return {"detail": 'Order Placed'}
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)

@router.get('/all', response_model=List[order.Show_Order])
async def get_all(db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_superuser)):
    return db.query(models.Orders).all()

@router.get('/me', response_model=List[order.Show_Order])
async def get_my(db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_user)):
    return db.query(models.Orders).filter(models.Orders.user_id == current_user.id).all()
