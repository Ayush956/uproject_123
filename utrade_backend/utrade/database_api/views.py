from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
import requests
from .serializers import StockSerializer

class stock_info(APIView):
    def get(self,request):
        name = request.GET.get('name')
        data = stock.objects.get(name=name)
        serializer = StockSerializer(data)
        serialized_data = serializer.data
        return Response(serialized_data)
    
class all_stock(APIView):
    def get(self,request):
        data = stock.objects.all().values()
        return Response(data)

