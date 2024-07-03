export interface Mapper<I, O> {
  toDomain(raw: I): O; // Récupère un objet de la base de données et le transforme en entité
  fromDomain(data: O): I; // Idem au sens inverse
}
