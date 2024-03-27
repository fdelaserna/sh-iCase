# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_pos_payment_method(self):
        result = super()._loader_params_pos_payment_method()
        result['search_params']['fields'].append('enable_multi_currency')
        return result

    def get_closing_control_data(self):
        data = super(PosSession, self).get_closing_control_data()
        fields = self.env['pos.order'].search_read([], fields=['multi_currency_id', 'multi_currency_amount'])
        print(11111111, fields)
        aggregated_amounts = {}
        for item in fields:
            print(2222222, item)
            multi_currency_id = item['multi_currency_id']
            multi_currency_amount = item['multi_currency_amount']
            # Skip entries with multi_currency_id False
            if multi_currency_id is False:
                continue
            # If multi_currency_id already exists in the dictionary, add multi_currency_amount to its total
            if multi_currency_id in aggregated_amounts:
                aggregated_amounts[multi_currency_id] += multi_currency_amount
            else:
                # Otherwise, initialize a new entry in the dictionary with the current multi_currency_amount
                aggregated_amounts[multi_currency_id] = multi_currency_amount
        print(33333,aggregated_amounts)
        foreign_currency = {}
        # Extract currency codes and amounts
        for currency, amount in aggregated_amounts.items():
            currency_code = currency[1]  # Access the second element of the tuple (currency code)
            foreign_currency[currency_code] = amount
        print(44444,foreign_currency)
        data['foreign_currency'] = foreign_currency
        return data
