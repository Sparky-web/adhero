import {FiltersInterface, GroupInterface, Sort} from "../types/app";
import {client, q} from "../db";

async function getGroups(
        filters: FiltersInterface,
        before: any[] | null,
        after: any[] | null,
        sort: Sort
    )
    : Promise<{ data: GroupInterface[], after: any[] | null, before: any[] | null }> {

    const res = await client.query(
        q.Map(
            q.Paginate(
                q.Filter(
                    q.Match(q.Index(sort === "by_price" ? "groups_by_price" : "groups_by_subscribers")),
                    q.Lambda(
                        sort === "by_price" ? ["price", "subs", "ref"] : ["subs", "price", "ref"],
                        q.And(
                            q.GTE(q.Var("price"), filters.price.min),
                            q.GTE(q.Var("subs"), filters.subscribers.min),
                            q.GTE(filters.price.max, q.Var("price")),
                            q.GTE(filters.subscribers.max, q.Var("subs")),
                        )
                    )
                ),
                {size: 5, after: after || undefined, before: before || undefined}
            ),
            q.Lambda(["price", "subs", "ref"], q.Get(q.Var("ref"))))
    ) as { after: any[], before: any[], data: any[] }

    return {...res, data: res.data.map(el => el.data)}
}

export default getGroups;
