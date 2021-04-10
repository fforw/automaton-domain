/**
 * Field Type Enum
 * 
 * @type {{Condition: string, JSONB: string, String: string, Timestamp: string, Int: string, BigDecimal: string, Date: string, GenericScalar: string, FieldExpression: string, Float: string, Byte: string, DomainObject: string, Long: string, Boolean: string}}
 */
const FieldType = {
    String: "String",
    Boolean: "Boolean",
    Float: "Float",
    Byte: "Byte",
    Timestamp: "Timestamp",
    GenericScalar: "GenericScalar",
    JSONB: "JSONB",
    DomainObject: "DomainObject",
    FieldExpression: "FieldExpression",
    Long: "Long",
    Int: "Int",
    Condition: "Condition",
    BigDecimal: "BigDecimal",
    Date: "Date"
};

export const FieldTypeNames = new Set(
    Object.keys(FieldType)
)

export default FieldType;
