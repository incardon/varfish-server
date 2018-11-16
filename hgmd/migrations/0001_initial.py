# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-16 00:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="HgmdPublicLocus",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("release", models.CharField(max_length=32)),
                ("chromosome", models.CharField(max_length=32)),
                ("start", models.IntegerField()),
                ("end", models.IntegerField()),
                ("variation_name", models.CharField(max_length=32)),
            ],
        )
    ]
