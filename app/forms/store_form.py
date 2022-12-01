from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Store

class StoreEditorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    cover_image_url = StringField('Cover Image Url')
    profile_image_url = StringField('Store Profile Image Url')
    about = StringField('About', validators=[DataRequired()])
    submit = SubmitField('Open Store')