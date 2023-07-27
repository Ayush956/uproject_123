from rest_framework import serializers

class StockSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    day_open = serializers.IntegerField()
    previous_close_price = serializers.IntegerField()
    day_high = serializers.IntegerField()
    day_low = serializers.IntegerField()
    price = serializers.IntegerField()
    last_trade_time = serializers.CharField(max_length=100)
    _week_high = serializers.IntegerField()
    _week_low = serializers.IntegerField()  