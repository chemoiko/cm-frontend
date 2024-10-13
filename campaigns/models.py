from django.db import models
from django.template.defaultfilters import slugify
from cloudinary.models import CloudinaryField

# Create your models here.


class Campaign(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    slug = models.SlugField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # transforms whatever we upload to a jpg
    logo = CloudinaryField('Image', overwrite=True, format='jpg')

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        to_assign = slugify(self.title)

        if Campaign.objects.filter(slug=to_assign).exists():
            to_assign = to_assign+'-'+str(Campaign.objects.all().count())

        self.slug = to_assign

        super().save(*args, **kwargs)


class Subscriber(models.Model):
    campaign = models.ForeignKey(to=Campaign, on_delete=models.DO_NOTHING)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)
