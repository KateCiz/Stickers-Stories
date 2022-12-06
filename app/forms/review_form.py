from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    content = StringField('My Review', validators=[DataRequired()])
    star_rating = SelectField('Star Rating', choices=[(1), (2), (3), (4), (5)], validators=[DataRequired()]) # this is a select field with options 1-5 FIX!!!
    photo = StringField('Photo')
    submit = SubmitField('Leave My Review')