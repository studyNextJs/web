# Generated by Django 5.0.6 on 2024-06-03 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_response_survey_rename_choice_text_choice_text_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='password',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
