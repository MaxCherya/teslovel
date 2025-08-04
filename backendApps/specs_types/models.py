from django.db import models


class LocalizedNameMixin:
    def get_localized_name(self, lang_code: str) -> str:
        return getattr(self, f"name_{lang_code}", self.name_en)


class Status(models.Model, LocalizedNameMixin):
    name_uk = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150)
    name_ru = models.CharField(max_length=150)

    def __str__(self):
        return self.name_en


class BatteryType(models.Model, LocalizedNameMixin):
    name_uk = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150)
    name_ru = models.CharField(max_length=150)

    def __str__(self):
        return self.name_en


class BrakesType(models.Model, LocalizedNameMixin):
    name_uk = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150)
    name_ru = models.CharField(max_length=150)

    def __str__(self):
        return self.name_en


class EnginePosition(models.Model, LocalizedNameMixin):
    name_uk = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150)
    name_ru = models.CharField(max_length=150)

    def __str__(self):
        return self.name_en