# Generated by Django 5.0.6 on 2024-06-05 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_survey_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
