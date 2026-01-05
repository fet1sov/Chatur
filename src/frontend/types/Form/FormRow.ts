enum RowType {
    input,
    submit
}

export default interface FormRow {
    title: string,
    placeholder: string,
    name: string,
    type: RowType
}