from marshmallow import Schema, fields

class OutputMovesMultimediaDTO(Schema):
    """
    Represents a DTO with well enough data for the user
    """
    move = fields.Str(attribute='winner__name')
    url = fields.Str(attribute='winner__image_url')

class OutputGameMultimediaDTO(Schema):
    """
    Represents a DTO with well enough data for the user
    """
    url = fields.Str(attribute='url')
    moves = fields.Nested(OutputMovesMultimediaDTO(),many=True)