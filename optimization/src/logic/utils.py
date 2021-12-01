
def get_manifestos(db, manifestos):
    month_manifesto_product_query = "SELECT * FROM month_manifesto_product"
    month_manifesto_product = db.df_query(month_manifesto_product_query)
    manifestos_dict = {}

    for _, manifesto in manifestos.iterrows():
        print("HOLLEE")
        manifesto_id = manifesto['id']
        m_list = month_manifesto_product.loc[month_manifesto_product['manifesto_id'] == manifesto_id]
        print(m_list)
        manifestos_dict[manifesto_id] = m_list.to_dict()