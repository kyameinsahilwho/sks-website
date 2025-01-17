'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import '@mdxeditor/editor/style.css';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  BlockTypeSelect,
  CodeToggle,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
} from '@mdxeditor/editor';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MDXEditor = dynamic(
  () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  { ssr: false }
);

interface Post {
  slug: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  metaDescription?: string;
  keywords?: string;
  tags: string[];
  coverImage?: string;
}

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Title and content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          published: true,
          metaDescription,
          keywords,
          tags,
          coverImage,
        }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Post created successfully",
        });
        setTitle('');
        setContent('');
        setMetaDescription('');
        setKeywords('');
        setTags([]);
        setCoverImage(null);
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleEditPost = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setMetaDescription(post.metaDescription || '');
    setKeywords(post.keywords || '');
    setTags(post.tags || []);
    setCoverImage(post.coverImage || null);
    setEditingPost(post);
  };

  const handleDeletePost = async (slug: string) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: editingPost.slug,
          title,
          content,
          published: editingPost.published,
          metaDescription,
          keywords,
          tags,
          coverImage,
        }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
        setEditingPost(null);
        setTitle('');
        setContent('');
        setMetaDescription('');
        setKeywords('');
        setTags([]);
        setCoverImage(null);
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const togglePublished = async (slug: string, currentState: boolean) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          published: !currentState,
        }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: `Post ${!currentState ? 'published' : 'unpublished'} successfully`,
        });
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  const editorPlugins = [
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    codeBlockPlugin(),
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <UndoRedo />
          <BoldItalicUnderlineToggles />
          <BlockTypeSelect />
          <CreateLink />
          <CodeToggle />
        </>
      )
    })
  ];

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create">
            <TabsList>
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="manage">Manage Posts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Meta Description (SEO)"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
                <Input
                  placeholder="Keywords (SEO)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <Input
                  placeholder="Cover Image URL"
                  value={coverImage || ''}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" onClick={addTag}>Add Tag</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-muted px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 prose-container">
                <MDXEditor
                  markdown={content}
                  onChange={(value: string) => setContent(value)}
                  plugins={editorPlugins}
                  contentEditableClassName="prose dark:prose-invert max-w-none min-h-[200px] p-4"
                />
              </div>
              <Button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </TabsContent>
            
            <TabsContent value="manage">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Select
                    defaultValue="all"
                    onValueChange={(value: 'all' | 'published' | 'draft') => setFilter(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter posts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Drafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {filteredPosts.map((post) => (
                  <Card key={post.slug} className={!post.published ? "opacity-60" : ""}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{post.title}</h3>
                            {!post.published && (
                              <span className="text-xs bg-muted px-2 py-1 rounded">Draft</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="space-x-2 flex items-center">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`publish-${post.slug}`}
                              checked={post.published}
                              onCheckedChange={() => togglePublished(post.slug, post.published)}
                            />
                            <Label htmlFor={`publish-${post.slug}`}>
                              {post.published ? 'Published' : 'Draft'}
                            </Label>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePost(post.slug)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}