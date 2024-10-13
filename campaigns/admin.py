from django.contrib import admin
from .models import Campaign, Subscriber

class CampaignModelAdmin(admin.ModelAdmin):
    list_display=('title', 'created_at', 'updated_at')
    search_fields = ('title', 'campaign__title', 'description')
    list_per_page = 1   #this adds pagination

class SubscriberModelAdmin(admin.ModelAdmin):       #this will show the users email and when he signed up
    list_display=('email', 'created_at', 'campaign')
    search_fields = ('title', 'description')
    list_per_page = 1   #this adds pagination



# Register your models here.
admin.site.register(Campaign, CampaignModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)