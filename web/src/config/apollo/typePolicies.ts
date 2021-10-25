import { TypePolicies } from '@apollo/client';

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      notes: {
        merge(existing, incoming, { readField }) {
          const merged: Record<any, any> = { ...existing };
          incoming.forEach((item: any) => {
            merged[readField('updated_at', item) as any] = item;
          });
          return merged;
        },

        read(existing) {
          return existing && Object.values(existing);
        },
      },
    },
  },
};
export default typePolicies;
