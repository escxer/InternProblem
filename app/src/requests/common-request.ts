import { t } from 'elysia';
import { ORDER_DIRECTION } from '../../../packages/domains/entities';

export const QueryPagingValidator = t.Object({
	page: t.Number({ minimum: 1, default: 1 }),
	perPage: t.Number({ minimum: 1, default: 10 }),
	orderBy: t.String({ default: 'createdAt' }),
	orderDirection: t.Enum(ORDER_DIRECTION, { default: ORDER_DIRECTION.DESC }),
});

export const IdValidator = t.Object({
	id: t.String(),
});