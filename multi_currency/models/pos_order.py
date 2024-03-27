from odoo import api, fields, models


class PosOrder(models.Model):
    """Extends the POS Order model for refund functionality."""
    _inherit = 'pos.order'

    multi_currency_amount = fields.Float(string='Customer Currency Amount')
    multi_currency_id = fields.Many2one('res.currency',
                                        string='Customer Currency')

    @api.model
    def _order_fields(self, ui_order):
        """Extend the function to include additional signature-related fields.
        :param ui_order: The user interface order.
        :return: A dictionary of order fields including signature, name, and
        date."""
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        print(00, ui_order)
        order_fields['multi_currency_amount'] = ui_order.get('multi_currency_amount')
        order_fields['multi_currency_id'] = ui_order.get('multi_currency_id')
        return order_fields
