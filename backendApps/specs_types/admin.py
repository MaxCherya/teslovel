from django.contrib import admin
from .models import *

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_uk', 'name_ru')

@admin.register(BatteryType)
class BatteryTypeAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_uk', 'name_ru')

@admin.register(BrakesType)
class BrakesTypeAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_uk', 'name_ru')

@admin.register(EnginePosition)
class EnginePositionAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_uk', 'name_ru')