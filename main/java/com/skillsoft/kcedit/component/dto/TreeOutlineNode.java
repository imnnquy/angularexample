/**
 * 
 */
package com.skillsoft.kcedit.component.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * Tree out line abstract node
 */
public class TreeOutlineNode {

    private String id;

    private String title;

    private String type;
    
    private String allowCopy;

    private List<TreeOutlineNode> nodes;
    
    private String parentId;
    
    private String homePageId;

    public TreeOutlineNode() {

    }

    public TreeOutlineNode(String id, String title, String type, String allowCopy) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.allowCopy = "true".equalsIgnoreCase(allowCopy) ? "true" : "false";
    }

    public TreeOutlineNode(String id, String title, String type, List<TreeOutlineNode> nodes) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.nodes = nodes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAllowCopy() {
        return allowCopy;
    }

    public void setAllowCopy(String allowCopy) {
        this.allowCopy = allowCopy;
    }

    public List<TreeOutlineNode> getNodes() {
        if (nodes == null) {
            nodes = new ArrayList<TreeOutlineNode>();
        }
        return nodes;
    }

    public void setNodes(List<TreeOutlineNode> nodes) {
        this.nodes = nodes;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getHomePageId() {
        return homePageId;
    }

    public void setHomePageId(String homePageId) {
        this.homePageId = homePageId;
    }

    public String toString(String prefix) {
        String nodeString = "";
        nodeString += prefix + id + ":" + title + ":" + type + "\n";

        if (nodes != null) {
            for (TreeOutlineNode node : nodes) {
                nodeString += node.toString(prefix + "-");
            }
        }
        return nodeString;

    }

    @Override
    public String toString() {
        return this.toString("");
    }

    public void addNode(TreeOutlineNode node) {
        if (this.nodes == null) {
            this.nodes = new ArrayList<TreeOutlineNode>();
        }
        this.nodes.add(node);
    }
}
