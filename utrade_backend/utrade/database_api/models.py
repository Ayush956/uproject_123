from django.db import models

# Create your models here.
class stock(models.Model):
    name = models.CharField(max_length=100)
    day_open = models.IntegerField()
    previous_close_price = models.IntegerField()
    day_high = models.IntegerField()
    day_low = models.IntegerField()
    price = models.IntegerField()
    last_trade_time = models.CharField(max_length=100)
    _week_high = models.IntegerField()
    _week_low = models.IntegerField()  

