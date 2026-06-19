import type { Schema, Struct } from '@strapi/strapi';

export interface OpeningHourOpeningHour extends Struct.ComponentSchema {
  collectionName: 'components_opening_hour_opening_hours';
  info: {
    displayName: 'opening_hour';
  };
  attributes: {
    close: Schema.Attribute.String;
    closed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    day: Schema.Attribute.String;
    open: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'opening-hour.opening-hour': OpeningHourOpeningHour;
    }
  }
}
