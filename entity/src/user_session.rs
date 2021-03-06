//! SeaORM Entity. Generated by sea-orm-codegen 0.6.0

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use sea_orm::EntityTrait;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Deserialize, Serialize)]
#[sea_orm(table_name = "user_session")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub user_id: i64,
    pub session_id: String,
    pub session_type: String,
    pub user_agent: String,
    pub email: String,
    pub expires_by: DateTimeUtc,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::user::Entity")]
    User,
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
