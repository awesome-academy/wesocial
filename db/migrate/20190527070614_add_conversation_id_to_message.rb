class AddConversationIdToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :conversation_id, :integer
  end
end
