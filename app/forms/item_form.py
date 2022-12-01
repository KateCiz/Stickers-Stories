from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired
from app.models import Item

class ItemEditorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    image_url = StringField('Image Url', validators=[DataRequired()])
    content = StringField('Content', validators=[DataRequired()])
    content_type = SelectField('Content Type', choices=['sticker', 'story'], validators=[DataRequired()])
    submit = SubmitField('Post My Item')



