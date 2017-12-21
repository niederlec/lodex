/* eslint max-len: off */
export default {
    Admin: 'Admin',
    'Sign in': 'Sign in',
    parsing: 'Imported',
    parsing_summary: '%{count} resources loaded',
    parsing_summary_columns: '%{count} columns loaded',
    publication_summary_columns: '%{count} columns added',
    'total lines': 'total lines',
    'successfully parsed': 'successfully parsed',
    'with errors': 'with errors',
    upload_another_file: 'Upload a dataset',
    Cancel: 'Cancel',
    Username: 'Username',
    Password: 'Password',
    line: 'line',
    error: 'error',
    atom: 'atom',
    publish: 'Publish',
    publication: 'Publication',
    publication_explanations:
        'Publishing will make your transformed data public. Once it has been published, you will not be able to modify it.',
    published:
        'Your data has been published online. You can further configure its display and/or update it by using the public interface.',
    showing: 'Showing {from} to {to} of {total}',
    page: 'Page',
    perPage: 'per page',
    loading: 'Loading...',
    loading_parsing_results: 'Loading parsing results',
    publication_preview: 'Preview',
    click_to_edit_publication_field: 'Click this field to edit it',
    add_transformer: 'Add an operation',
    add_class: 'Add an class',
    enter_class: 'Enter your class',
    class: 'class',
    remove_class: 'remove class',
    annotate_class: 'Add new class',
    remove_transformer: 'Remove this operation',
    fieldLabel: 'Label',
    fieldName: 'Name',
    fieldValue: 'Value',
    fieldScheme: 'Scheme',
    select_an_operation: 'Select an operation',
    cover: 'Cover',
    select_cover: 'Select a coverage',
    cover_dataset: 'Apply to whole dataset',
    cover_collection: 'Different for each resource',
    cover_document: 'Only present on certain resource',
    dataset_characteristics: 'Characteristics',
    export: 'Export as %{type}',
    settings: 'Settings',
    danger_zone: 'Danger zone',
    clear: 'Clear',
    clear_publish: 'Clear published',
    clear_dataset: 'Clear dataset',
    sign_out: 'Sign out',
    back_to_list: 'Back to list',
    not_found: 'Resource not found',
    powered: 'Powered by',
    loading_resource: 'Resource loading...',
    error_label_required: 'Label is required',
    error_cover_required: 'Cover is required',
    error_scheme_invalid: 'scheme must be an url',
    error_position_invalid: 'Position is invalid (must be greater than zero)',
    error_position_required: 'Position is required',
    error_position_uri_must_come_first: 'URI field must be the first',
    error_transformers_contributions_no_transformers:
        'A contribution cannot have an operation',
    error_composedOf_contribution_no_composed_of:
        'A contribution cannot have a composedOf attribute',
    'error_composedOf.separator_required': 'ComposedOf separator is required',
    'error_composedOf.separator_invalid':
        'ComposedOf separator must be a string',
    'error_composedOf.fields_required':
        'ComposedOf must have at least two fields',
    'error_composedOf.fields_invalid': 'ComposedOf fields must exists',
    error_completes_inexisting_target_field: 'Completed field must exists',
    error_label_invalid_label: 'Label must be at least 2 characters long',
    error_cover_invalid_contribution_cover:
        'A contribution must have a cover document',
    error_cover_invalid_cover: 'Cover must be either dataset or collection',
    error_language_invalid: 'Language is invalid',
    'error_transformer.operation_invalid':
        'Operation %{operation} does not exists',
    'error_transformer.args_invalid':
        'Operation %{operation} is invalid : it requires %{args} args',
    remove_resource: 'Remove the resource',
    enter_reason: 'Enter your reason',
    reason: 'Reason',
    removed_resource_at: 'This resource was removed %{date}',
    cancel: 'Cancel',
    listen_up: 'Listen up! This is a potentially destructive action',
    enter_name: 'Please type in the name of the lodex instance.',
    edit: 'Edit',
    edit_field: 'Edit %{field}',
    configure_field: 'Configure %{field}',
    edit_ontology_field: '%{field} parameters',
    save: 'Save',
    hide: 'Hide',
    'add-field': 'Add a field',
    removed_resources: 'Removed resources',
    restore: 'Restore',
    removed_at: 'Removed at',
    removed_reason: 'Reason',
    add_field_to_resource: 'add a field to this resource',
    about_you: 'Enter your information:',
    contributorName: 'Enter your name',
    contributorMail: 'Enter your email',
    select_contribution_field: 'Select a field',
    new_contribution_field: 'Create a new field',
    new_field: 'Field',
    contributed_by: 'Contributed by %{name}',
    added_by: 'Added by %{name}',
    add_to_publication: 'Add to publication',
    add_column: 'Add a new column',
    no_dataset: 'No dataset',
    scheme: 'scheme',
    format: 'format',
    exit_column_edition: 'Back to preview',
    upload_file: 'Upload a file',
    annotate_field: 'Annotate another field',
    completes_field_none: 'None',
    completes_field_X: 'Annotates %{field}',
    remove_from_publication: 'Remove',
    separator: 'separator',
    composed_of: 'Composed of',
    wizard_composed_of:
        'Compose this field - the following fields will be displayed under it',
    transformers: 'Operations',
    add: 'add',
    remove: 'remove',
    select_a_field: 'select a field',
    select_a_format: 'Apply a format',
    language: 'Language',
    close: 'close',
    export_data: 'Export',
    export_fields: 'Export model',
    import_fields: 'Import model',
    view_fields: 'View model',
    confirm_import_fields:
        'Importing a saved model will override your current work. Are you sure ?',
    import_fields_failed:
        "Your model couldn't be imported. Please ensure you selected the correct file.",
    no: 'No',
    contributed_resources: 'Contributed resources',
    review: 'review',
    contribution_filter: 'list resources with %{status} contribution',
    PROPOSED: 'proposed',
    VALIDATED: 'validated',
    REJECTED: 'rejected',
    field_display_in_list: 'Display on list page',
    field_display_in_resource: 'Display on resource page',
    field_display_in_graph: 'Display in graph page',
    field_searchable:
        'Searchable - global full text search will target this field',
    filter: 'enter your search term here',
    no_result: 'No matching resource found',
    field_is_facet: 'Is a facet',
    add_facet: 'Add a facet',
    select_facet_value: 'Select a value for: %{facet}',
    add_column_from_original_dataset: 'Add a column from original dataset',
    Login: 'Sign in',
    show_publication_errors: 'Errors',
    model: 'Model',
    overview: 'Syndication',
    resource_details: 'Details',
    share_export: 'Share/Export',
    ontology: 'Ontology',
    resources: 'Resources',
    details: 'Details',
    copy_to_clipboard: 'Copy',
    resource_share_link: 'Link to this resource',
    dataset_share_link: 'Link to this dataset',
    share: 'Share',
    columns: 'Columns',
    resource_share_export: 'Share/Export',
    resource_ontology: 'Ontology',
    versions: 'versions',
    latest: 'latest',
    after_field: 'After %{field}',
    first_position: 'At first position',
    position: 'Position',
    field_wizard_step_value: 'How the value is generated',
    field_wizard_step_tranforms: 'Transformations applied on the value',
    field_wizard_step_identity: 'General informations',
    field_wizard_step_display: 'How and where it is displayed',
    field_wizard_step_search: 'Search related',
    field_wizard_step_semantic: 'Semantics',
    previous: 'Previous',
    next: 'Next',
    a_value: 'An arbitrary value',
    enter_a_value: 'Enter the value',
    a_column: 'A value from an existing column',
    select_a_column: 'Select a column',
    a_composition: 'A value from multiple columns',
    enter_a_separator: 'Enter a separator (optional)',
    remove_composition_column: 'Remove',
    add_composition_column: 'Add another column',
    an_autogenerated_uri: 'Generate URIs automatically',
    a_link_to_another_column: 'A link to another column',
    select_a_ref_column: 'Select the column which identifies the linked column',
    select_an_id_column: 'Select the column which targets the linked column',
    add_characteristic: 'add characteristic',
    label: 'label',
    value: 'value',
    valid: 'valid',
    instance_name: "Enter instance's name",
    'add-field-to-resource': 'add field',
    'semantic-publication-system': 'Semantic publication system',
    'modelize-your-data': 'Model and publish your data to the semantic web!',
    'easy-creation':
        'Easily create your custom website from your CSV, XML, etc.',
    'semantic-web-compatibility':
        'Your repositories, thesauri, experiment results will be compatible with the semantic web!',
    'easy-update':
        'You can easily modify them and enrich them with a guarantee of traceability.',
    'first-upload': 'Start by loading a data file.',
    'publish-punchline':
        'Publish your data, you can always easily modify and enrich them later with a guarantee of traceability.',
    remove_column: 'Remove this column',
    multi_field_concat: 'A list of values from several existing columns',
    duplicated_uri:
        '%{nbInvalidUri} documents have duplicated uri and will not be published',
    warn_publication: 'Warning: uri is not unique for every document',
    force_publish: 'Publish anyway',
    embed_widget: 'Embed this resource in your website',
    select_exported_fields_all: 'All fields',
    select_exported_fields: 'Select the fields to display in the widget',
    filter_fields_for_widgets: 'Type here to filter the list of fields',
    widget: 'Default widget',
    list_format_select_type: 'Select a type of list',
    list_format_unordered: 'Unordered list',
    list_format_ordered: 'Ordered list',
    uri_format_select_type: 'How is the label defined ?',
    uri_format_column: 'Label is the column content',
    uri_format_custom: 'List is a custom text (same for all resources)',
    uri_format_another_column: 'Label is the content of another column',
    uri_format_custom_value: 'The custom text',
    uri_format_another_column_value: 'The column',
    'TypeError: Failed to fetch': 'Could not access api',
    istex_results: 'ISTEX search results for %{searchTerm}:',
    istex_total: '%{total} results',
    none: 'None',
    description: 'Description',
    navigate_to_published_data: 'Go to my published data',
    moderation: 'Moderation',
    apply: 'Apply',
    auto_generate_uri: 'Leave empty to autogenerate uri',
    required: 'Required',
    invalid_uri: 'Uri must either start with /:uid or /:ark or be a valid url',
    create_resource: 'Add a new resource to the dataset',
    uri_conflict: 'A Document already exists with the same uri',
    supported_format_list: 'List of supported file format:',
    composed_of_fields: 'Composed of %{fields}',
    field_label_exists: 'Field already exists',
    raw: 'JSON',
    csv: 'CSV',
    tsv: 'TSV',
    min: 'Min',
    jsonld: 'JSON-LD',
    jsonldcompacted: 'JSON-LD (Compacted)',
    nquads: 'N-Quads',
    nquadsextended: 'N-Quads Extended',
    nquadsextendedcompressed: 'N-Quads Extended (Compressed)',
    turtle: 'Turtle',
    upload_url: 'upload from url',
    invalid_url: 'url is invalid',
    or: 'or',
    html: 'HTML content',
    list: 'List content (Array)',
    uri: 'Internal URI',
    email: 'Email value',
    image: 'Image URL',
    link: 'External URL',
    contextualBarchart: 'Contextual chart',
    istex: 'ISTEX Query',
    markdown: 'Markdown',
    ten_percent: '10 %',
    twenty_percent: '20 %',
    thirty_percent: '30 %',
    fifty_percent: '50 %',
    eighty_percent: '80 %',
    hundred_percent: '100 %',
    list_format_select_image_width: 'Percent of width',
    title: 'Title',
    level1: 'Title 1',
    level2: 'Title 2',
    level3: 'Title 3',
    level4: 'Title 4',
    list_format_select_level: 'Choose title level',
    dataset: 'Dataset',
    paragraph: 'Paragraph',
    identifier: 'Identifier',
    count_of_field: '# documents',
    resource: 'Resource',
    globalPiechart: 'Pie Chart',
    globalRadarchart: 'Radar Chart',
    globalBarchart: 'Bar Chart',
    max_fields: 'Maximum fields number',
    colors_set: 'Colors set',
    order_by: 'Order by',
    label_asc: 'Label ↗',
    label_desc: 'Label ↘',
    value_desc: 'Value ↘',
    value_asc: 'Value ↗',
    size1: 'Very big',
    size2: 'Big',
    size3: 'Bold',
    list_format_select_size: 'Choose size',
    identifierBadge: 'Identifier badge',
    list_format_select_identifier: 'Choose the resolver',
    sentence: 'Sentence',
    prefix: 'prefix',
    suffix: 'suffix',
    automatic: 'Automatic',
    parser_name: 'Parser name',
    select_file: 'Select which file you want to load',
    select_parser: 'Select which parser you want to apply',
    bad_format:
        'Inappropriate format for %{label}, expected simple value but got array, please use list format',
    field_width: 'width',
    graph_list: 'graph list',
    filter_value: 'filter %{field}',
    exclude: 'exclude',
    count: 'count',
    no_chart_data: 'no data to visualize',
    chart_error: 'Error while trying to retrieve chart data',
    excluding: 'excluding',
    axis_round_value: 'force round value in axis',
    scale: 'scale',
    linear: 'linear',
    log: 'logarithmic',
    home: 'home',
    color_scheme: 'color scheme',
    hover_color_scheme: 'hover color scheme',
    default_color: 'default color',
    cartography: 'cartography',
    emphasedNumber: 'emphasedNumber',
    resourcesGrid: 'resourcesGrid',
    trelloTimeline: 'trelloTimeline',
    direction: 'direction',
    horizontal: 'horizontal',
    vertical: 'vertical',
    right_margin: 'right margin (px)',
    max_value: 'max value',
    min_value: 'min value',
};
