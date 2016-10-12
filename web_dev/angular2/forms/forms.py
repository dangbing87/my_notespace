from wtforms import Form
from wtforms.fields import StringField
from wtforms.validators import Required
from wtforms.validators import ValidationError


class ModifyTitleForm(Form):
    """
    Modify title form
    """

    todo_id = StringField(validators=[Required()])
    title = StringField(validators=[Required()])
