<!-- Demo6CustomTreeView.vue -->
<script>
import "he-tree-vue/dist/he-tree-vue.css";
import {
  Tree, // Base tree
  Fold,
  Check,
  Draggable, // plugins
  //foldAll,
  //unfoldAll,
  //cloneTreeData,
  walkTreeData,
  //getPureTreeData, // utils
} from "he-tree-vue";

import { computed } from "vue";

export default {
  extends: Tree,

  mixins: [Fold, Check, Draggable],

  props: {
    triggerClass: { default: "drag-trigger" },
    // prevent drag by default.
    draggable: { type: [Boolean, Function], default: false },
    droppable: { type: [Boolean, Function], default: false },
  },

  setup(props, context) {
    let total = computed(() => {
      let i = 0;
      /* eslint-disable no-debugger */
      debugger
      walkTreeData(props.rootNode, () => {
        i++;
      });
      return i;
    });

    const blockFooter = () => {
      return (
        <div class="footer">
          <i>Комментариев:</i> {total}
        </div>
      );
    };

    const reply = () => {
      context.emit('reply');
    };

    const showHidden = () => {
      walkTreeData(props.rootNode, (node) => {
        node["$hidden"] = false;
      });
    };

    const toggleChildNodes = (node, toggleShow) => {
      if (!node.children) return
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        child["$hidden"] = toggleShow;
      }
      node["$wrapped"] = toggleShow;
    };

    const search = (e) => {
      const value = e.target.value || "";
      walkTreeData(props.rootNode, (node) => {
        node["$hidden"] = !node.text.includes(value);
      });
    };

    const nodeEdit = (node) => {
      console.log("nodeEdit: ", node);
      context.emit("nodeEdit", node);
    };
    const nodeReply = (node) => {
      console.log("nodeReply: ", node);
      context.emit("nodeReply", node);
    };
    const nodeDelete = (node) => {
      console.log("nodeDelete: ", node);
      context.emit("nodeDelete", node);
    };
    
    const overrideSlotDefault = ({ node, /* index, path, tree */ }, original) => {
      // const classes = isActive && "node-active";
      return (
        <div className={`node-wrapper ${node.isChildren && "node-children"}`}>
          <div className="node-content">
            <div>{original()}</div>
            { node.children ?
                !node.$wrapped ? 
                <button class="mls btn" onClick={() => toggleChildNodes(node, true)}>
                  Свернуть
                </button> :
                <button class="mls btn" onClick={() => toggleChildNodes(node, false)}>
                  Развернуть
                </button>
              : ''
            }
          </div>
          <div className="node-footer">
            <button onClick={() => nodeEdit(node)}>Редактировать</button>
            <button onClick={() => nodeReply(node)}>Ответить</button>
            <button onClick={() => nodeDelete(node)}>Удалить</button>
          </div>
        </div>
      );
    };

    const blockHeader = () => {
      return (
        <div class="header">
          <div class="btn-group">
            <button class="btn-group__item" onClick={reply}>
              Ответить
            </button>
            <button classs="btn-group__item" onClick={showHidden} class="mls">
              Развернуть ветку
            </button>
          </div>
          <input
            class="search"
            onKeydown={(e) => e.key === "Enter" && search(e)}
            placeholder="Поиск"
          />
        </div>
      );
    };

    return {
      overrideSlotDefault,
      blockHeader,
      blockFooter,
      reply,
      showHidden,
      toggleChildNodes,
      search,
    };
  },
};
</script>

<style scoped>
.search {
  margin: 5px;
  padding: 10px 5px;
  width: calc(100% - 20px);
  border: none;
  border-radius: 5px;
}

.tree-children {
  margin-left: 15px;
}
.node-children {
  background: rgb(183, 93, 243) !important;
}

.btn-group {
  margin: 5px;
  display: flex;
  justify-content: flex-start;
}

.btn-group button {
  margin-right: 5px;
}

.btn-group button:nth-last-child(1) {
  margin: 0;
}

.node-wrapper[data-v-1d41da13] {
    width: 100%;
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: left;
    line-height: 18px;
    font-size: 14px;
    border: 1px solid #ccc;
}

.node-wrapper:hover {
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.63);
}

.node-content {
  padding: 15px;
}

.node-footer {
  padding: 15px;
  padding-top: 0;
}

.btn {
  margin: 3px;
}
</style>

<style>
.tree-node-back {
  padding: 0 !important;
  width: 100%;
}
.tree-node-back .tree-node {
  border: none;
}
.my-tree-view1 .mls {
  margin-left: 5px;
}
.my-tree-view1 .mrs {
  margin-right: 5px;
}
.my-tree-view1 .tree-node {
  padding: 0;
  border: none;
}
.my-tree-view1 .node-content {
  display: flex;
}
.my-tree-view1 .node-content .fold-btn {
  display: flex;
  justify-content: center;
  width: 22px;
  border-radius: 100%;
  border: none;
  background: #fcf1a8;
}
.my-tree-view1 .tree-node-back:hover {
  background: #f5f5f5;
}
.my-tree-view1 .header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.he-tree .footer {
  margin: 10px;
  margin-top: 10px;
  text-align: left;
}
.he-tree .footer i {
  color: #fff;
  font-weight: bold;
}
</style>
