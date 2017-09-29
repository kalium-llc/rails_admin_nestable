$(document).on('rails_admin.dom_ready', function() {
  var $tree_nodes, $tree_nodes_max_depth, $tree_nodes_options, $update_button, updateNodes;
  updateNodes = function(tree_nodes) {
    var serialized_tree;
    serialized_tree = tree_nodes.nestable('serialize');
    return $.ajax({
      url: tree_nodes.data('update-path'),
      type: 'POST',
      data: {
        tree_nodes: serialized_tree
      },
      success: function(data) {
        var $flash;
        $flash = $('<div>').addClass('nestable-flash alert alert-success').append($('<button>').addClass('close').data('dismiss', 'alert').html('&times;')).append($('<span>').addClass('body').html(data));
        $('#rails_admin_nestable').append($flash);
        return $flash.fadeIn(200).delay(2000).fadeOut(200, function() {
          return $(this).remove();
        });
      }
    });
  };
  $tree_nodes = $('#tree_nodes');
  $tree_nodes_options = {};
  $tree_nodes_max_depth = $tree_nodes.data('max-depth');
  $update_button = $('#rails_admin_nestable button');
  $update_button.click(function() {
    return updateNodes($tree_nodes);
  });
  if ($tree_nodes_max_depth && $tree_nodes_max_depth !== 'false') {
    $tree_nodes_options['maxDepth'] = $tree_nodes_max_depth;
  }
  $tree_nodes.nestable($tree_nodes_options);
  $('.dd-item').addClass('dd-collapsed');
  $('.dd-item > button').toggle();
});
