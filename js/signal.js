//---------- Blog Descriptions
let editorinstance;

// CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
//     // plugins: [ PasteFromOffice, Bold, /* ... */ ],
//     toolbar: {
//         items: [
//             "exportPDF",
//             "exportWord",
//             "|",
//             "findAndReplace",
//             "selectAll",
//             "|",
//             "heading",
//             "|",
//             "bold",
//             "italic",
//             "strikethrough",
//             "underline",
//             "code",
//             "subscript",
//             "superscript",
//             "removeFormat",
//             "|",
//             "bulletedList",
//             "numberedList",
//             "todoList",
//             "|",
//             "outdent",
//             "indent",
//             "|",
//             "undo",
//             "redo",
//             "-",
//             "fontSize",
//             "fontFamily",
//             "fontColor",
//             "fontBackgroundColor",
//             "highlight",
//             "|",
//             "alignment",
//             "|",
//             "link",
//             "insertImage",
//             "blockQuote",
//             "insertTable",
//             "mediaEmbed",
//             "codeBlock",
//             "htmlEmbed",
//             "|",
//             "specialCharacters",
//             "horizontalLine",
//             "pageBreak",
//             "|",
//             "textPartLanguage",
//             "|",
//             "sourceEditing",
//         ],
//         shouldNotGroupWhenFull: true,
//     },
//     list: {
//         properties: {
//             styles: true,
//             startIndex: true,
//             reversed: true,
//         },
//     },
//     heading: {
//         options: [
//             { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
//             {
//                 model: "heading1",
//                 view: "h1",
//                 title: "Heading 1",
//                 class: "ck-heading_heading1",
//             },
//             {
//                 model: "heading2",
//                 view: "h2",
//                 title: "Heading 2",
//                 class: "ck-heading_heading2",
//             },
//             {
//                 model: "heading3",
//                 view: "h3",
//                 title: "Heading 3",
//                 class: "ck-heading_heading3",
//             },
//             {
//                 model: "heading4",
//                 view: "h4",
//                 title: "Heading 4",
//                 class: "ck-heading_heading4",
//             },
//             {
//                 model: "heading5",
//                 view: "h5",
//                 title: "Heading 5",
//                 class: "ck-heading_heading5",
//             },
//             {
//                 model: "heading6",
//                 view: "h6",
//                 title: "Heading 6",
//                 class: "ck-heading_heading6",
//             },
//         ],
//     },
//     placeholder: "Welcome to CKEditor 5!",
//     fontFamily: {
//         options: [
//             "default",
//             "Arial, Helvetica, sans-serif",
//             "Courier New, Courier, monospace",
//             "Georgia, serif",
//             "Lucida Sans Unicode, Lucida Grande, sans-serif",
//             "Tahoma, Geneva, sans-serif",
//             "Times New Roman, Times, serif",
//             "Trebuchet MS, Helvetica, sans-serif",
//             "Verdana, Geneva, sans-serif",
//         ],
//         supportAllValues: true,
//     },
//     fontSize: {
//         options: [10, 12, 14, "default", 18, 20, 22],
//         supportAllValues: true,
//     },
//     htmlSupport: {
//         allow: [
//             {
//                 name: /.*/,
//                 attributes: true,
//                 classes: true,
//                 styles: true,
//             },
//         ],
//     },
//     htmlEmbed: {
//         showPreviews: true,
//     },
//     link: {
//         decorators: {
//             addTargetToExternalLinks: true,
//             defaultProtocol: "https://",
//             toggleDownloadable: {
//                 mode: "manual",
//                 label: "Downloadable",
//                 attributes: {
//                     download: "file",
//                 },
//             },
//         },
//     },
//     mention: {
//         feeds: [
//             {
//                 marker: "@",
//                 feed: [
//                     "@apple",
//                     "@bears",
//                     "@brownie",
//                     "@cake",
//                     "@cake",
//                     "@candy",
//                     "@canes",
//                     "@chocolate",
//                     "@cookie",
//                     "@cotton",
//                     "@cream",
//                     "@cupcake",
//                     "@danish",
//                     "@donut",
//                     "@dragée",
//                     "@fruitcake",
//                     "@gingerbread",
//                     "@gummi",
//                     "@ice",
//                     "@jelly-o",
//                     "@liquorice",
//                     "@macaroon",
//                     "@marzipan",
//                     "@oat",
//                     "@pie",
//                     "@plum",
//                     "@pudding",
//                     "@sesame",
//                     "@snaps",
//                     "@soufflé",
//                     "@sugar",
//                     "@sweet",
//                     "@topping",
//                     "@wafer",
//                 ],
//                 minimumCharacters: 1,
//             },
//         ],
//     },
//     removePlugins: [
//         "CKBox",
//         "CKFinder",
//         "EasyImage",
//         "RealTimeCollaborativeComments",
//         "RealTimeCollaborativeTrackChanges",
//         "RealTimeCollaborativeRevisionHistory",
//         "PresenceList",
//         "Comments",
//         "TrackChanges",
//         "TrackChangesData",
//         "RevisionHistory",
//         "Pagination",
//         "WProofreader",
//         "MathType",
//     ],
//     addPlugins: [
//         "paste"
//     ]
// }).then((editor) => {
//     editorinstance = editor;
//     console.log("CKEditor initialized successfully");
// }).catch((error) => {
//     console.error(error);
// });

CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    toolbar: {
        items: [
            'exportPDF', 'exportWord', '|',
            'findAndReplace', 'selectAll', '|',
            'heading', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'outdent', 'indent', '|',
            'undo', 'redo',
            '-',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
            'alignment', '|',
            'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
            'textPartLanguage', '|',
            'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
    },
    // Changing the language of the interface requires loading the language file using the <script> tag.
    // language: 'es',
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    placeholder: 'Welcome to CKEditor 5!',
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
        ],
        supportAllValues: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    // Be careful with enabling previews
    // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    htmlEmbed: {
        showPreviews: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    mention: {
        feeds: [
            {
                marker: '@',
                feed: [
                    '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                    '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                    '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                    '@sugar', '@sweet', '@topping', '@wafer'
                ],
                minimumCharacters: 1
            }
        ]
    },
    // The "super-build" contains more premium features that require additional configuration, disable them below.
    // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
    removePlugins: [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        'CKBox',
        'CKFinder',
        'EasyImage',
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        // 'Base64UploadAdapter',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType.
        'MathType',
        // The following features are part of the Productivity Pack and require additional license.
        'SlashCommand',
        'Template',
        'DocumentOutline',
        'FormatPainter',
        'TableOfContents'
    ]
}).then((editor) => {
    editorinstance = editor;
    console.log("CKEditor initialized successfully");
}).catch((error) => {
    console.error(error);
});


//---------- Add Signal
const add_signal = () => {
    var text = editorinstance.getData();
    console.log(text)
    var Image = $("#Image_input").val()

    // input validation
    if (text == "" && Image == "") {
        alert("Please Enter all fields!");
        return;
    }


    var formData = new FormData();
    formData.append('text', text);
    formData.append('file', $("#Image_input")[0].files[0]);

    $.ajax({
        type: "POST",
        url: root + main_route + '/insert_signal',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                alert("Signal Uploaded Successfully!")
                Fetch_All_Signal()
                $(':input').val('');
                editorinstance.setData("");
                $('#submit').show()
            }
            else {
                alert("Unable to upload Signal")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })
};


//---------- Delete Signal
const del_signal = (ts) => {
    if (confirm("Are you Sure?")) { }
    else { return }
    $.post(
        root + main_route + "/delete_signal",
        { timestamp: ts },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            Fetch_All_Signal();
            $(":input").val("");
            editorinstance.setData("");
            $("#submit").show();
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};


//---------- Fetch All Signal
const Fetch_All_Signal = () => {
    $.post(root + main_route + "/get_signal", function (data, status) {
        All_signal = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < (All_signal.length); i++) {
            // data pre preprocessing
            let ts = All_signal[i][0];
            let user = All_signal[i][1]
            let Image = All_signal[i][2]
            let text = All_signal[i][3]
            All_signal[i][0] = moment.unix(All_signal[i][0]).format("DD-MMM HH:mm A");
            All_signal[i][1] = user;
            All_signal[i][2] = `<div class="w-100" style="cursor:pointer"><a href="#" data-toggle="tooltip" title="${text}">${shorten(text)}</div>`
            All_signal[i][3] = Image;
            var str =
                `<button class="m-2" onclick="del_signal('${ts}')">&nbsp;Delete&nbsp;</button>`;
            All_signal[i][4] = str;
        }
        if (All_signal) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1;
                datatable = $("#signalDatatable").DataTable({
                    paging: true,
                    pageLength: 50,
                    info: false,
                    scrollX: true,
                    scrollY: 550,
                    order: false
                });
            }
            datatable.clear();
            datatable.rows.add(All_signal);
            datatable.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Blog Submit
document.querySelector("#submit").addEventListener("click", () => {
    add_signal();
});



//---------- Shorten Function
const shorten = (text, length = 75) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    temp.push(text);
    text = text.substring(0, length);
    return text + "...";
};



//---------- Show_Hide Table
const show_hide = () => {
    counter_for_show_hide += 1;
    if (counter_for_show_hide % 2 == 0) {
        $('.wrapper_1_button').text('Hide')
        $('#table_datatable').show()
    }
    else {
        $('.wrapper_1_button').text('Show')
        $('#table_datatable').hide()
    }
}


//---------- On Ready - Refresh
$(document).ready(function () {
    console.log = function () { };
    $.ajaxSetup({ async: false }); // to stop async

    $("#submit").show();

    counter_for_datatable = 0;
    counter_for_show_hide = 0;
    temp = [];

    Fetch_All_Signal();

    $("#signalDatatable tbody").on("click", "td", function () {
        var cell = $(this);
        var text = cell.text();

        if (
            cell.children().length === 0 &&
            cell.contents().length === 1 &&
            cell.contents()[0].nodeType === Node.TEXT_NODE
        ) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    console.log("Text copied to clipboard: " + text);
                    $('#notification').text('Text copied to clipboard')
                    $('#notification').fadeIn('slow').delay(2000).fadeOut('slow');
                })
                .catch((err) => {
                    console.error("Failed to copy text: " + err);
                    $('#notification').text('Failed to copy text')
                    $('#notification').fadeIn('slow').delay(2000).fadeOut('slow');
                });
        }
    });

});