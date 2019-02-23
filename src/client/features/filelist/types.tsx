export type TextFileEntry = Readonly<{
    item: {
      path: string;
      type: 'file';
      content: string;
      virtual?: true;
      asset?: false;
    };
    state: {
      isOpen?: boolean;
      isFocused?: boolean;
      isSelected?: boolean;
      isCreating?: boolean;
      isExpanded?: false;
    };
  }>;
  
  export type AssetFileEntry = Readonly<{
    item: {
      path: string;
      type: 'file';
      uri: string;
      asset: true;
      virtual?: true;
    };
    state: {
      isOpen?: boolean;
      isFocused?: boolean;
      isSelected?: boolean;
      isCreating?: boolean;
      isExpanded?: false;
    };
  }>;
  
  export type FolderEntry = Readonly<{
    item: {
      path: string;
      type: 'folder';
      asset?: false;
      virtual?: false;
    };
    state: {
      isOpen?: boolean;
      isFocused?: boolean;
      isExpanded?: boolean;
      isSelected?: boolean;
      isCreating?: boolean;
    };
  }>;
  
  export type FileSystemEntry = TextFileEntry | AssetFileEntry | FolderEntry;
  
  export type Viewer = {
    username: string;
    nickname: string;
    picture?: string;
    user_metadata?: {
      appetize_code: string;
    };
  };
  