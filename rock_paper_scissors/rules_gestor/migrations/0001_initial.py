# Generated by Django 3.0.3 on 2020-02-23 01:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Modes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, unique=True)),
                ('description', models.CharField(max_length=100)),
                ('image_url', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'it001_modes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Moves',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, unique=True)),
                ('description', models.CharField(max_length=100)),
                ('image_url', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'it001_moves',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Rules',
            fields=[
                ('winner', models.OneToOneField(db_column='winner', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='rules_gestor.Moves')),
                ('description', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'it001_rules',
                'managed': False,
            },
        ),
    ]
