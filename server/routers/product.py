from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.database import get_db
from schemas import product, user
from core import oauth2
from models import models

router = APIRouter(
    prefix='/item',
    tags=['Products']
)

@router.post('/')
async def create_product(request: product.Product, db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_superuser)):
    new_product = models.Product(
        name = request.name,
        description = request.description,
        price = request.price,
        qty = request.qty,
        is_veg = request.is_veg
    )
    try:
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {"detail": "Product Added"}
    except:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)

@router.get('/all', response_model=List[product.Show_Products])
async def get_all(db: Session = Depends(get_db), current_user: user = Depends(oauth2.get_current_superuser)):
    return db.query(models.Product).all()
    